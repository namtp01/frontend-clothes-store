import React, { useEffect } from 'react'
import styled from "styled-components"
//import { categories } from './CData.js';
import CategoryItem from './CategoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from './../../redux/actions/CategoryActions';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;
const Categories = () => {

  const dispatch = useDispatch()

  const categoryList = useSelector(state => state.categoryList)
  const { loading, error, categories = [] } = categoryList

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])
  return (
    <Container>
        {categories.map(item=>(
            <CategoryItem item={item} key={item._id}/>
        ))}
    </Container>
  )
}

export default Categories