import {
    Box, 
    Button,
    ChakraProvider, 
    Flex, 
    Heading, 
    Checkbox
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
  
  interface User {
    isOptedIn?: boolean;
    uid?: string;
  }

  interface OptProps {
    user: User | null;
    onLogout: () => void;
  }

  const Opt = ({ user, onLogout }: OptProps) => {
    const [localUser, setLocalUser] = useState<User | null>(null);
    const [isOptedIn, setIsOptedIn] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        if (user && user.uid) {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', user.uid);
    
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setLocalUser({ isOptedIn: userData.isOptedIn || false, uid: user.uid });
            } else {
              setLocalUser(null);
            }
          } catch (error) {
            console.error("Error fetching user document:", error);
          }
        } else {
          setLocalUser(null);
        }
      };
  
      fetchData();
    }, [user]);  
  
    const handleOptInChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const optedIn = e.target.checked;
      setIsOptedIn(optedIn);

      console.log(`Opt-in status changed: ${optedIn}`);
    
      if (user && user.uid) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
    
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Update local state
            setLocalUser({ ...localUser, isOptedIn: optedIn });
    
            // Update Firestore with new opt-in status
            await setDoc(userDocRef, { isOptedIn: optedIn }, { merge: true });
            
            console.log(`Fetched user data: ${JSON.stringify(userData)}`);

            // Proceed only if user opts in
            if (optedIn) {
              // Replace these with actual field names from userData
              const userEmail = userData.email;
              const userName = userData.displayName;
    
              console.log(`Sending data to SendGrid: Email - ${userEmail}, Name - ${userName}`);

              // Send to SendGrid
              const response = await fetch('/api/sendgrid', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, name: userName }),
              });
    
              console.log(`Response from SendGrid API: Status - ${response.status}`);

              if (!response.ok) {
                throw new Error('Failed to update SendGrid contact');
              }
    
              // Handle success
            }
          } else {
            console.error("User document does not exist.");
          }
        } catch (error) {
          console.error('Error in opt-in process:', error);
        }
      }
    };    
  
    return (
      <ChakraProvider>
        <Flex align="center" justify="center" minHeight="100vh">
          <Box p={6} boxShadow="md">
            <Heading mb={4}>User Profile</Heading>
            <Checkbox
              isChecked={isOptedIn}
              onChange={handleOptInChange}
            >
              Opt in/out for the email list
            </Checkbox>
            <Button onClick={onLogout} colorScheme="red" mt={4}>Log Out</Button>
          </Box>
        </Flex>
      </ChakraProvider>
    );
  };  
  
  export default Opt;
  