import { NextApiRequest, NextApiResponse } from 'next';

interface SendGridList {
    id: string;
    name: string;
    // ... other properties ...
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, action } = req.body;
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

    if (action === 'add') {
      const { firstName, lastName, username } = req.body; 
      // Handle 'add' action
      const apiUrl = 'https://api.sendgrid.com/v3/marketing/contacts';
      const data = {
        list_ids: [listId],
        contacts: [{
          email: email.toLowerCase(),
          first_name: firstName,
          last_name: lastName,
          unique_name: username,
        }],
      };

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error(`SendGrid responded with error: ${errorResponse}`);
        throw new Error(`Failed to add to SendGrid contact list: ${response.status}`);
      }

      const result = await response.json();
      return res.status(200).json(result);

    } else if (action === 'remove') {
        // Search for contact ID using the correct endpoint and format
        const searchResponse = await fetch(`https://api.sendgrid.com/v3/marketing/contacts/search`, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            query: `email = '${email.toLowerCase()}'`
            }),
        });

        if (!searchResponse.ok) {
            throw new Error(`Failed to search for contact: ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        console.log("Search Data:", searchData); // Log for debugging

        // Adjust according to the actual response structure
        const contactId = searchData.result?.[0]?.id;

        if (!contactId) {
            throw new Error('Contact not found in SendGrid');
        }

        // Remove the user from the specific list
        const listRemovalUrl = `https://api.sendgrid.com/v3/marketing/lists/${listId}/contacts`;
        const listRemovalQuery = new URLSearchParams({ contact_ids: contactId }).toString();
        const fullListRemovalUrl = `${listRemovalUrl}?${listRemovalQuery}`;

        const listRemovalResponse = await fetch(fullListRemovalUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${SENDGRID_API_KEY}`
            },
      });

      if (!listRemovalResponse.ok) {
        const errorResponse = await listRemovalResponse.text();
        console.error(`Error removing from list: ${errorResponse}`);
        throw new Error(`Failed to remove from SendGrid list: ${listRemovalResponse.status}`);
      }

      // Delete the user from All Contacts
      const query = new URLSearchParams({ ids: contactId }).toString();
      const allContactsRemovalUrl = `https://api.sendgrid.com/v3/marketing/contacts?${query}`;

      const allContactsResponse = await fetch(allContactsRemovalUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`
        },
      });

      if (!allContactsResponse.ok) {
        const errorResponse = await allContactsResponse.text();
        console.error(`Error removing from all contacts: ${errorResponse}`);
        throw new Error(`Failed to remove from SendGrid all contacts: ${allContactsResponse.status}`);
      }

      const result = await allContactsResponse.json();
      return res.status(200).json(result);

    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      console.error('Detailed Error:', error);
      return res.status(500).json({ error: error.message });
    } else {
      console.error('An unexpected error occurred');
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
