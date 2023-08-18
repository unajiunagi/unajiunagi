import { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

// supabase/auth-helperの設定
const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query

  if (code) {
    const supabaseServerClient = createPagesServerClient({ req, res })
    await supabaseServerClient.auth.exchangeCodeForSession(String(code))
  }

  res.redirect(`${process.env.NEXT_PUBLIC_END_POINT}/auth/setNewPassword`);
}

export default handler
