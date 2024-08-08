import {ReactComponent as Logo} from '../assets/Logo320.svg'
import styled from 'styled-components';
import Profile from '../components/Profile/Profile';

const Div = styled.div`
    &.BG{
        margin-top: 124px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &.Top{
        width: 80%;
        display: flex;
        justify-content: center;
    }

    &.Intro{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 150px;
    }

    &.Bottom{
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 60px;
    }

    &.Profiles{
        display: flex;
        height: 200px;
        justify-content: center;
        align-items: center;
        background-color: #fafafa;
        border-radius: 20px;
        margin-top: 20px;
    }
`;

const P = styled.p`
    margin: 0;
    font-family: 'Pretendard-Bold';
    &.title{
        font-size: 56px;
        margin-bottom: 20px;
    }
    &.content{
        font-size: 24px;
        margin-bottom: 10px;
    }
    &.sub-content{
        font-family: 'Pretendard-Regular';
        font-size: 16px;
    }
    &.developer{
        font-family: 'Pretendard-SemiBold';
        font-size: 22px;
    }
`;



function ServiceInfo() {
    const developerInfo = [
        {url : "https://github.com/rktlskan021", img : "https://avatars.githubusercontent.com/u/68416831?v=4", id : "@rktlskan021"},
        {url : "https://github.com/forestsol", img : "https://avatars.githubusercontent.com/u/51287968?v=4", id : "@forestsol"},
        {url : "https://github.com/ima9ine4", img : "https://avatars.githubusercontent.com/u/105336619?v=4", id : "@ima9ine4"},
        {url : "https://github.com/IamWonILuvWon", img : "https://avatars.githubusercontent.com/u/113083948?v=4", id : "@IamWonILuvWon"},
        {url : "https://github.com/coladribble", img : "https://avatars.githubusercontent.com/u/134242170?v=4", id : "@coladribble"},
    ]

    return (
        <Div className='BG'>
            <Div className='Top'>
                <Logo/>
                <Div className='Intro'>
                    <P className='title'>아이랑 아이(AI)랑</P>
                    <P className='content'>책을 멀리하게 된 아이들을 위해서</P>
                    <P className='sub-content'>아이랑 아이(AI)랑은 어린이들을 대상으로 기획하였고,<br/>전자기기에 익숙해져 책을 멀리하게 된 아이들을 위한 기능들로 이루어져 있습니다.</P>
                </Div>
            </Div>
            <Div className='Bottom'>
                <P className='developer'>개발진</P>
                <Div className='Profiles'>
                    {developerInfo.map((item) => {
                        return <Profile url={item.url} img={item.img} id={item.id} />
                    })}
                </Div>
            </Div>
        </Div>
    )
}

export default ServiceInfo;