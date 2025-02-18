import styled from 'styled-components/native';

const container = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25%; /* Changed to a more readable unit */
    background-color: #25292e;
    border-top-left-radius: 32px; /* Rounded-t-2xl equivalent in styled-components */
`;

const header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 20%; /* Changed to a more readable unit */
    background-color: #464c55;
    border-top-left-radius: 32px; /* Rounded-t-lg equivalent in styled-components */
    padding: 10px; /* px-5 equivalent in styled-components */
`;

const title = styled.Text`
    color: white;
    font-size: 18px; /* text-base equivalent in styled-components */
`;

const S = {
    container,
    header,
    title,
};

export default S;
