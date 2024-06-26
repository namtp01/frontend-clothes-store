import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../redux/actions/UserActions"
import { listCategories } from "../redux/actions/CategoryActions"

const Header = () =>
{
    const [keyword, setKeyword] = useState()
    const dispatch = useDispatch()

    let navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const userLogin = useSelector((state) => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const categoryList = useSelector(state => state.categoryList)
    const { loadingcategory, errorcategory, categories = [] } = categoryList

    const parentCategories = categories.filter((category) => !category.parent)

    const childCategories = categories.filter((category) => category.parent)

    useEffect(() =>
    {
        dispatch(listCategories())
    }, [dispatch])

    const logoutHandler = () =>
    {
        dispatch(logout())
    }

    const submitHandler = (e) =>
    {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <div>
            {/* Top Header */}
            {/* Header */}
            <div className="header navbar-color">
                <div className="container">
                    {/* MOBILE HEADER */}
                    <div className="mobile-header">
                        <div className="container ">
                            <div className="row">
                                <div className="col-6 d-flex align-items-center">
                                    <Link className="navbar-brand" to="/">
                                        <img alt="logo" src="/images/cloth-logo5.png" />
                                    </Link>
                                </div>
                                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                                    {
                                        userInfo ? (
                                            <div className="btn-group">
                                                <button
                                                    type="button"
                                                    className="name-button dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fas fa-user"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item" to="/profile">
                                                        Profile
                                                    </Link>

                                                    <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                                                        Logout
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="btn-group">
                                                <button
                                                    type="button"
                                                    className="name-button dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fas fa-user"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item" to="/login">
                                                        Login
                                                    </Link>

                                                    <Link className="dropdown-item" to="/register">
                                                        Register
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <Link to="/cart" className="cart-mobile-icon">
                                        <i className="fas fa-shopping-bag"></i>
                                        <span className="badge">{cartItems.length}</span>
                                    </Link>
                                </div>
                                <div className="col-12 d-flex align-items-center">
                                    <form onSubmit={submitHandler} className="input-group">
                                        <input
                                            type="search"
                                            className="form-control rounded search"
                                            placeholder="Search"
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                        <button type="submit" className="search-button">
                                            search
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PC HEADER */}
                    <div className="pc-header">
                        <div className="row">
                            <div className="col-md-3 col-4 d-flex align-items-center">
                                <Link className="navbar-brand navbar-color" to="/">
                                    <img alt="logo" src="/images/cloth-logo5-resize.png" />
                                </Link>
                            </div>
                            <div className="col-md-6 col-8 d-flex align-items-center">
                                <form onSubmit={submitHandler} className="input-group">
                                    <input
                                        type="search"
                                        className="form-control rounded search"
                                        placeholder="Search"
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button type="submit" className="search-button">
                                        search
                                    </button>
                                </form>
                            </div>
                            <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                                {
                                    userInfo ? (
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="name-button dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Hi, {userInfo.name}
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link className="dropdown-item" to="/profile">
                                                    Profile
                                                </Link>

                                                <Link className="dropdown-item" to="#"
                                                    onClick={logoutHandler}
                                                >
                                                    Logout
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Link className="text-light" to="/register">
                                                Register
                                            </Link>
                                            <Link className="text-light" to="/login">
                                                Login
                                            </Link>
                                        </>
                                    )
                                }
                                <Link to="/cart">
                                    <i className="fas fa-shopping-bag" style={{ color: 'white' }}></i>
                                    <span className="badge">{cartItems.length}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Announcement shadow p-3 mb-5 bg-body rounded">
                <div className="container ">
                    <div className="row ">
                        {/* <div className="col-md-6 d-flex align-items-center display-none">
                            <p>+84 38 310 6586</p>
                            <p>nam@gmail.com</p>
                        </div> */}
                        <div className="justify-content-center justify-content-lg-center d-flex align-items-center ">

                            <div className="">
                                <a className="margin-lt-2" href="/" style={{ fontSize: "100%" }}>
                                    ALL PRODUCTS
                                </a>
                            </div>
                            {
                                parentCategories.map((parent) => (
                                    <div className="dropdown">
                                        <a className="btn dropdown-toggle" href={`/category/${parent.name}`} role="button"
                                            id={`dropdownMenuLink-${parent._id}`} data-toggle="dropdown" style={{ fontSize: "100%" }}>
                                            {parent.name.toUpperCase()}
                                        </a>
                                        <div className="dropdown-menu">
                                            {
                                                childCategories
                                                    .filter((child) => child.parent === parent._id)
                                                    .map((child) => (
                                                        <a className="dropdown-item" href={`/category/${child.name}`}>{child.name}</a>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header