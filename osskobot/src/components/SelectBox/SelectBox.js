import styled from "styled-components";

const Select = styled.select`
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
    border: none;
    color: rgba(55, 56, 60, 0.6);
    &:focus{
        outline: 0;
    }
`;


function SelectBox() {
    const selectList = [
        {value: 1, name:"신규등록순"},
        {value: 2, name:"제목순"},
        {value: 3, name:"인기순"}
    ];
    
    return(
        <Select>
            {selectList.map((value, key) => {
                return <option value={value.value} key={key}>
                    {value.name}
                </option>
            })}
        </Select>
    )
}

export default SelectBox;