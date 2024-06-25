import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from "../redux/actions/CartActions";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ShippingScreen = ({ history }) =>
{
  window.scrollTo(0, 0);
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress = {} } = cart
  const { phone: initialPhone = "", address: initialAddress = "", ward: initialWard = "", district: initialDistrict = "", province: initialProvince = "" } = shippingAddress

  const [province, setProvince] = useState(initialProvince)
  const [district, setDistrict] = useState(initialDistrict)
  const [ward, setWard] = useState(initialWard)
  const [address, setAddress] = useState(initialAddress)
  const [phone, setPhone] = useState('')

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const dispatch = useDispatch()

  const token = '56616a1f-30d0-11ef-8e53-0a00184fe694'

  useEffect(() =>
  {
    const fetchProvinces = async () =>
    {
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
          headers: {
            'token': token,
            'Content-Type': 'application/json'
          }
        })
        setProvinces(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProvinces()
  }, [])

  useEffect(() => {
    if (!province) return;

    const fetchDistricts = async () => {
      try {
        const provinceObj = provinces.find(p => p.ProvinceName === province);
        if (!provinceObj) return;

        const response = await axios({
          method: 'GET',
          url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
          headers: {
            'token': token,
            'Content-Type': 'application/json'
          },
          params: {
            'province_id': provinceObj.ProvinceID
          }
        })
        setDistricts(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDistricts()
  }, [province, provinces])

  useEffect(() => {
    if (!district) return;

    const fetchWards = async () => {
      try {
        const districtObj = districts.find(p => p.DistrictName === district);
        if (!districtObj) return;

        const response = await axios({
          method: 'GET',
          url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward',
          headers: {
            'token': token,
            'Content-Type': 'application/json'
          },
          params: {
            'district_id': districtObj.DistrictID
          }
        })
        setWards(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchWards()
  }, [district, districts])



  const submitHandler = (e) =>
  {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, province, district, ward }))
    navigate('/payment');
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY INFORMATION</h6>
          
          <input type="text" placeholder="Enter phone number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <input type="text" placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <select className="form-select p-3 mt-3" value={province} onChange={(e) => setProvince(e.target.value)}>
            {provinces.map((provinceObj, index) => (
              <option key={index} value={provinceObj.ProvinceName}>
                {provinceObj.ProvinceName}
              </option>
            ))}
          </select>
          <select className="form-select p-3 mt-3" value={district} onChange={(e) => setDistrict(e.target.value)}>
            {districts.map((districtObj, index) => (
              <option key={index} value={districtObj.DistrictName}>
                {districtObj.DistrictName}
              </option>
            ))}
          </select>
          <select className="form-select p-3 mt-3" value={ward} onChange={(e) => setWard(e.target.value)}>
            {wards.map((wardObj, index) => (
              <option key={index} value={wardObj.WardName}>
                {wardObj.WardName}
              </option>
            ))}
          </select>
          <button type="submit">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
