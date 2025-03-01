// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@/service/response';
import { MongoUser } from '@fastgpt/support/user/schema';
import { setCookie } from '@fastgpt/support/user/auth';
import { generateToken } from '@fastgpt/support/user/auth';
import { connectToDatabase } from '@/service/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error('缺少参数');
    }

    // 检测用户是否存在
    const authUser = await MongoUser.findOne({
      username
    });
    if (!authUser) {
      throw new Error('用户未注册');
    }

    const user = await MongoUser.findOne({
      username,
      password
    });

    if (!user) {
      throw new Error('密码错误');
    }

    const token = generateToken(user._id);
    setCookie(res, token);

    jsonRes(res, {
      data: {
        user,
        token
      }
    });
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
