import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { password } = JSON.parse(req.body)

    res.status(200).send({
      isAuthenticated: password === process.env.SITE_PASSWORD
    })
  }
}