import { NextApiRequest, NextApiResponse } from 'next';

interface SendGridList {
    id: string;
    name: string;
    // ... other properties ...
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name } = req.body;

    console.log(`Received data for SendGrid: Email - ${email}, Name - ${name}`);

    // Replace with your SendGrid API Key
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

    try {
      // Fetch list ID for 'obscurity-users'
      const listResponse = await fetch('https://api.sendgrid.com/v3/marketing/lists', {
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`
        }
      });

      if (!listResponse.ok) {
        throw new Error(`Failed to fetch lists: ${listResponse.status}`);
      }

      const lists = await listResponse.json();
      const obscurityUsersList = lists.result.find((list: SendGridList) => list.name === 'obscurity-users');

      if (!obscurityUsersList) {
        throw new Error('Obscurity-users list not found');
      }

      const listId = obscurityUsersList.id;

      const data = {
        list_ids: [listId],
        contacts: [
          {
            email: email.toLowerCase(), // Ensuring email is in lowercase
            first_name: name,
            // Add other fields if necessary
          },
        ],
      };

      // Send contacts to SendGrid
      const contactResponse = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!contactResponse.ok) {
        throw new Error(`Failed to add/update contact: ${contactResponse.status}`);
      }

      const result = await contactResponse.json();
      res.status(200).json(result);

      console.log(`SendGrid API response: ${JSON.stringify(result)}`);

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
      } else {
        console.error('An unexpected error occurred');
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
