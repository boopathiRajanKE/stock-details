import { NextApiRequest, NextApiResponse } from "next"
import { data } from "../../assets/data"

const response = {
  ok: true,
  data,
}

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(response)
}
