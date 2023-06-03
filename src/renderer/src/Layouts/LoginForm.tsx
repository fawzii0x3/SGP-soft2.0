import {
  useColorMode,
  Button,
  Flex,
  Stack,
  Image,
  Heading,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Container,
  InputGroup,
  IconButton,
  InputRightElement,
  useDisclosure,
  Spinner
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik'
import { UserLogin, useLoginMutation, useMeUserQuery } from '../hooks/graphql'
import Logo from '../assets/logo.png'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
const LoginFrom = () => {
  const [{ data, error, fetching }] = useMeUserQuery()
  const { colorMode, toggleColorMode } = useColorMode()
  const [, LoginMutation] = useLoginMutation()
  const { isOpen, onToggle } = useDisclosure()
  const navigate = useNavigate()
  const initialValues: UserLogin = {
    name: '',
    password: ''
  }
  const { errors, touched, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await LoginMutation({
        data: values
      })
    }
  })
  if (fetching) {
    return <Spinner />
  }
  if (data?.meUser && !error) {
    navigate('/')
  }
  return (
    <>
      <Flex width="full" justifyContent="flex-end">
        <Button tabIndex={-1} onClick={toggleColorMode} variant="ghost">
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="6">
          <Flex width="full" justifyContent="center">
            <Image height="40" width="40" src={Logo} rounded="100%" />
          </Flex>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
          </Stack>
        </Stack>
        <Box
          as={'form'}
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            handleSubmit(e)
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  variant="filled"
                  value={values.name}
                  onChange={handleChange}
                  tabIndex={1}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    value={values.password}
                    onChange={handleChange}
                    tabIndex={2}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="link"
                      aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={() => onToggle()}
                      tabIndex={-1}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
            </Stack>
          </Stack>
          <Stack spacing="6" mt={2}>
            <Button tabIndex={3} type="submit" variant="solid" colorScheme="blue">
              Sign in
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

export default LoginFrom
