import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { TrainingData, connectToDatabase } from '@/service/mongo';
import { startQueue } from '@/service/utils/tools';
import { authUser } from '@fastgpt/support/user/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    await connectToDatabase();
    const { userId } = await authUser({ req, authToken: true });
    await unlockTask(userId);
  } catch (error) {}
  jsonRes(res);
}

async function unlockTask(userId: string) {
  try {
    await TrainingData.updateMany(
      {
        userId
      },
      {
        lockTime: new Date('2000/1/1')
      }
    );

    startQueue();
  } catch (error) {
    unlockTask(userId);
  }
}
