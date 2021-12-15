import React, { FunctionComponent, useCallback, useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import { Col, Row } from "react-bootstrap";
import Checkbox from "components/Checkbox";
import Button from "components/Button";
import { isValidPhoneNumber, isValidEmail } from "utils/validation";
import { createFormBody } from "utils/api";
import { useRouter } from 'next/router'

const Card = styled.div`
    background: white;
    box-shadow: 0px 40px 120px rgba(2, 0, 89, 0.1);
    padding: 2rem;
`;

const Title = styled.h3`
    color: ${theme.palette.brand.primary500};
    margin-bottom: 2rem;
`;

const InputWrapper = styled.div`
    margin: 1rem 0;
`;

const FormLabel = styled.label`
    color: ${theme.palette.grayScale.gray900};
    font-weight: 600;
`;

const StyledFormInput = styled.input`
    background: white;
    color: ${theme.palette.grayScale.gray900};
    outline: none;
    line-height: 2.25;
    padding-left: 0.5rem;
    border: 1px solid ${theme.palette.grayScale.gray300};
    border-radius: 2px;
    width: 100%;

    ::placeholder {
        color: ${theme.palette.grayScale.gray500}
    }
`;

const ConsentDescription = styled.p`
    color: ${theme.palette.grayScale.gray500};
    font-weight: 600;
    line-height: 2;
    margin-top: -0.3rem;
    margin-bottom: 0;
`;

const ConsentLabel = styled.label`
    margin-bottom: 2rem;
`;

const ValidationMessage = styled.span`
    color: red;
    font-weight: 400;
`;

const SubmitButton = styled(Button)`
    width: 100%;
`;

type InputProps = {
    label: string;
    placeholder: string;
    value?: string;
    validationMessage?: string;
    setValue: (value: string) => void;
    setValidationMessage: (value: string) => void;
}

const FormTextInput: FunctionComponent<InputProps> = ({ label, placeholder, value, validationMessage, setValue, setValidationMessage }) => {
    return (
        <InputWrapper>
            <FormLabel>{label} {validationMessage && <ValidationMessage>{validationMessage}</ValidationMessage>}</FormLabel>
            <StyledFormInput
                placeholder={placeholder}
                value={value}
                onBlur={() => setValidationMessage("")}
                onChange={e => setValue(e.target.value)}
            />
        </InputWrapper>
    );
}

type ConsentCheckboxProps = {
    label?: string;
    value: boolean;
    validationMessage?: string;
    setValue: (value: boolean) => void;
    setValidationMessage: (value: string) => void;
}

const ConsentCheckbox: FunctionComponent<ConsentCheckboxProps> = ({ label, value, validationMessage, setValue, setValidationMessage }) => {
    const onCheck = useCallback((value: boolean) => {
        setValue(value);
        if (value) {
            setValidationMessage("");
        }
    }, [setValue, setValidationMessage])

    return (
        <ConsentLabel>
            <Row>
                <Col lg={1}>
                    <Checkbox checked={value} onChange={value => onCheck(value)} />
                </Col>
                <Col lg={11}>
                    <ConsentDescription>{label}</ConsentDescription>
                    {validationMessage && <ValidationMessage>{validationMessage}</ValidationMessage>}
                </Col>
            </Row>
        </ConsentLabel>
    )
}

const fieldIsRequired = "Pole jest wymagane";

type JoinClubProps = {
    title?: string;
    consentText?: string;
    buttonText?: string;
}

const JoinClub: FunctionComponent<JoinClubProps> = ({ title, consentText, buttonText }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [consent, setConsent] = useState(false);

    const [firstNameValidation, setFirstNameValidation] = useState("");
    const [lastNameValidation, setLastNameValidation] = useState("");
    const [emailValidation, setEmailValidation] = useState("");
    const [phoneNumberValidation, setPhoneNumberValidation] = useState("");
    const [consentValidation, setConsentValidation] = useState("");

    const router = useRouter();

    const onSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        let isValid = true;

        if (!firstName) {
            setFirstNameValidation(fieldIsRequired);
            isValid = false;
        }

        if (!lastName) {
            setLastNameValidation(fieldIsRequired);
            isValid = false;
        }

        if (!email) {
            setEmailValidation(fieldIsRequired);
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailValidation("Email ma niepoprawny format");
            isValid = false;
        }

        if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
            setPhoneNumberValidation("Nr telefonu ma niepoprawny format");
            isValid = false;
        }

        if (!consent) {
            setConsentValidation("Musisz wyrazić zgodę na kontakt");
            isValid = false;
        }

        if (isValid) {
            const headers = new Headers();
            headers.set("Content-Type", "application/x-www-form-urlencoded");
            const body = createFormBody([
                { key: "firstName", value: firstName },
                { key: "lastName", value: lastName },
                { key: "email", value: email },
                { key: "phoneNumber", value: phoneNumber },
            ]);

            fetch("/api/mail", {
                method: "POST",
                headers,
                body,
            })
                .then(res => {
                    if (res.ok) {
                        router.push("/join-thank-you");
                    } else {
                        setFirstNameValidation("Wystąpił błąd. Spróbuj ponownie.");
                    }
                })
        }

    }, [firstName, lastName, email, phoneNumber, consent, router]);

    return (
        <Card>
            <Title>{title}</Title>
            <form onSubmit={e => onSubmit(e)}>
                <FormTextInput
                    label={"Imię*"}
                    placeholder={"Wpisz swoje imię"}
                    value={firstName}
                    setValue={value => setFirstName(value)}
                    validationMessage={firstNameValidation}
                    setValidationMessage={setFirstNameValidation}
                />
                <FormTextInput
                    label={"Nazwisko*"}
                    placeholder={"Wpisz swoje nazwisko"}
                    value={lastName}
                    setValue={setLastName}
                    validationMessage={lastNameValidation}
                    setValidationMessage={setLastNameValidation}
                />
                <FormTextInput
                    label={"Email*"}
                    placeholder={"Podaj swój email"}
                    value={email}
                    setValue={setEmail}
                    validationMessage={emailValidation}
                    setValidationMessage={setEmailValidation}
                />
                <FormTextInput
                    label={"Telefon"}
                    placeholder={"Podaj nr telefonu"}
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    validationMessage={phoneNumberValidation}
                    setValidationMessage={setPhoneNumberValidation}
                />
                <ConsentCheckbox
                    label={consentText}
                    value={consent}
                    setValue={setConsent}
                    validationMessage={consentValidation}
                    setValidationMessage={setConsentValidation}
                />
                <SubmitButton type={"submit"} primary>
                    {buttonText}
                </SubmitButton>
            </form>
        </Card>
    );
}

export default JoinClub;