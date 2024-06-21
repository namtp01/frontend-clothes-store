import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

`;

const Info = styled.div`
  position: absolute;
  bottom: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// const Title = styled.h1`
//     color:black;
//     margin-bottom: 20px;
// `;

const Button = styled.button`
    position:absolute;
    top:70px;
    border:none;
    padding: 10px;
    background-color: white;
    color:grey;
    cursor: pointer;
    font-weight: 800;
    font-size:20px;
    height:60px;
    width:120px;
`;
const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to={`/category/${item.name}`}>
        <Image src={item.image}/>
        <Info>
          {/* <Title>{item.title}</Title> */}
          <Button>{item.name}</Button>
        </Info>
      </Link>
        
    </Container>
  )
}

export default CategoryItem