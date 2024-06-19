import React from 'react'
import styled from "styled-components"
import { categories } from './CData.js';
import CategoryItem from './CategoryItem';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;
const Categories = () => {

    // const categoryList = useSelector(state => state.categoryList)
    // const { loading, error, categories } = categoryList
  return (
    <Container>
        {categories.map(item=>(
            <CategoryItem item={item} key={item._id}/>
        ))}
    </Container>
  )
}

export default Categories