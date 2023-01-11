import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUser } from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import { USER_UPDATE_RESET } from "../constants/userConstants"

const UserEditScreen = () => {
  const dispatch = useDispatch()
  const { id: userId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate("/admin/userlist")
    } else {
      if (!user.name || userId !== user._id) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [userId, dispatch, user, successUpdate, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light py-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked)
                }}
              ></Form.Check>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
