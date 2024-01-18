import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  ChakraProvider
} from '@chakra-ui/react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("There was an issue with logging in. Please check your credentials and try again.");
    }
  };

  return (
    <ChakraProvider>
      <Flex
        align="center"
        justify="center"
        height="100vh"
      >
        <Box p={6} boxShadow="md">
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </FormControl>

          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>

          {error && <div>{error}</div>}

          <Button onClick={handleSignIn} colorScheme="blue">Log In</Button>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Login;
