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
    
      if (user && user.uid) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { isOptedIn: optedIn }, { merge: true });
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
  