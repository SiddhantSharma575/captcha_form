import { Alert, AlertTitle, Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RepeatIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"

const SignUp = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [enteredCaptch, setEnteredCaptch] = useState("")
    const [generatedCaptch, setGegerateCaptch] = useState("")
    const { colorMode, toggleColorMode } = useColorMode()

    const [error, setError] = useState("")

    useEffect(() => {
        generateNewCaptcha();
    }, [])

    function genrateString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }


    const generateNewCaptcha = () => {
        let num = Math.floor(Math.random() * (999 - 100 + 1) + 100).toString();
        let str = genrateString(3);
        let res = num.substring(0, 1) + str.substring(0, 2) + num.substring(1) + str.substring(2);
        setGegerateCaptch(res)
    }

    const handleSubmit = () => {
        if (!name || !email || !password || !confirmPassword) {
            setError("Please Enter all the Details...")
        } else if (password !== confirmPassword) {
            setError("Password doesn't match")
        } else if (enteredCaptch !== generatedCaptch) {
            setError("Captcha Doesn't Match")
        } else {
            setError("Success! Sign Up Successfull")
        }
        setTimeout(() => {
            setError("")
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setEnteredCaptch("")
        }, 2000)
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Flex alignItems="center" justifyContent="space-around" w="400px" mt="5">
                <Text fontSize="22px">Sign Up</Text>
                {
                    colorMode === "light" ? <MoonIcon onClick={toggleColorMode} /> :
                        <SunIcon onClick={toggleColorMode} />
                }
            </Flex>

            <FormControl isRequired width="300px" mt="5">
                <FormLabel fontSize="16px">Full Name</FormLabel>
                <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired width="300px" mt="15">
                <FormLabel fontSize="16px">Enter Email</FormLabel>
                <Input type="email" placeholder="Enter Email" w="100%" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired width="300px" mt="15">
                <FormLabel fontSize="16px">Enter Password</FormLabel>
                <InputGroup >
                    <Input type={show ? "text" : "password"} placeholder="Enter Password" w="100%" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="3rem">
                        <Button border="none" height="2.5rem" width="100%" onClick={() => setShow(!show)}>
                            {!show ? "Show" : "Hide"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl isRequired width="300px" mt="15">
                <FormLabel fontSize="16px">Confirm Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} placeholder="Confirm Password" w="100%" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <InputRightElement width="3rem">
                        <Button border="none" height="2.5rem" width="100%" onClick={() => setShow(!show)}>
                            {!show ? "Show" : "Hide"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Flex mt="10" alignItems="center">
                <Text bg="#ccc" p="3" borderRadius="3" >{generatedCaptch}</Text>
                <RepeatIcon w="10" h="10" ml="5" cursor="pointer" onClick={() => generateNewCaptcha()} />
            </Flex>
            <FormControl isRequired width="300px" mt="15">
                <FormLabel fontSize="16px">Enter Captcha</FormLabel>
                <Input placeholder="Enter Captcha" w="100%" value={enteredCaptch} onChange={(e) => setEnteredCaptch(e.target.value)} />
            </FormControl>
            {
                error && <Alert status={error.substring(0, 4) === "Succ" ? "success" : "error"} w="300px" mt="5">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            }
            <Button colorScheme="blue" mt="15" onClick={handleSubmit}>
                Sign Up
            </Button>
        </Box>
    )
}

export default SignUp