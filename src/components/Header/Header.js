import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

import { Redirect } from 'react-router-dom'

const Header = () => {
	//// -- Variables -- ////

	//// -- States -- ////

	const initialState = {
		name: '',
		family: '',
		common_name: '',
		genus: '',
		scientificName: '',
		image_url: 'https://i.imgur.com/iw0FTRY.png',
	}
	const [form, setForm] = useState(false)
	const [newPlantId, setNewPlantId] = useState(null)
	const [formState, setFormState] = useState(initialState)

	//// -- Functions / Handlers -- ////

	const handleClose = () => setForm(false)
	const handleShow = () => setForm(true)
	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value })
	}
	const url = 'https://botanical-babble.herokuapp.com/api/plants'

	const handleSubmit = function (event) {
		const data = formState
		event.preventDefault()

		Axios.post(url, data).then((response) => {
			setNewPlantId(response.data._id)
			console.log(response.data._id)
		})
	}
	if (newPlantId) {
		return <Redirect to={`/plant/${newPlantId}`} />
	}

	//// -- Page Content -- ////

	return (
		<>
			<Navbar
				as='header'
				sticky='top'
				bg='dark'
				expand='lg'
				variant='dark'
				style={{ fontSize: '20px' }}
				nav
				class='navbar navbar-light bg-light'>
				<Navbar.Brand href='/'>
					<img
						src='https://i.imgur.com/yb58Nd3.png'
						alt='babblelogo'
						height='95px'
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link href='/allplants'>All Plants</Nav.Link>
						<Nav.Link href='/randomplant'>Random Plant</Nav.Link>
						<Nav.Link onClick={handleShow}>New Plant</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Modal show={form} onHide={handleClose} centered size='lg'>
				<Modal.Header>
					<Modal.Title>Create A New Plant</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form action='submit' onSubmit={handleSubmit}>
						{/* Plant Name */}
						<Form.Group>
							<Form.Label>Plant Name</Form.Label>
							<Form.Control
								type='text'
								id='common_name'
								placeholder='ex. Evergreen oak'
								onChange={handleChange}
								required
							/>
							<Form.Text className='text-muted'></Form.Text>
						</Form.Group>

						{/* Scientific Name */}
						<Form.Group>
							<Form.Label>Scientific Name</Form.Label>
							<Form.Control
								type='text'
								id='scientific_name'
								placeholder='ex. Quercus rotundifolia'
								onChange={handleChange}
								required
							/>
						</Form.Group>

						{/* Family Common Name */}
						<Form.Group>
							<Form.Label>Family Common Name</Form.Label>
							<Form.Control
								type='text'
								id='family_common_name'
								placeholder='ex. Beech family'
								onChange={handleChange}
							/>
							<Form.Text className='text-muted'>* Optional</Form.Text>
						</Form.Group>

						{/* Family */}
						<Form.Group>
							<Form.Label>Family</Form.Label>
							<Form.Control
								type='text'
								id='family'
								placeholder='ex. Fagaceae'
								onChange={handleChange}
								required
							/>
						</Form.Group>

						{/* Genus */}
						<Form.Group>
							<Form.Label>Genus</Form.Label>
							<Form.Control
								type='text'
								id='genus'
								placeholder='ex. Quercus'
								onChange={handleChange}
								required
							/>
						</Form.Group>

						{/* Image */}
						<Form.Group>
							<Form.Label>Image URL</Form.Label>
							<Form.Control
								type='text'
								id='image_url'
								placeholder='ex. https://i.imgur.com/bFDWhkK.jpg'
								onChange={handleChange}
							/>
							<Form.Text className='text-muted'>
								* Must be a valid image URL
							</Form.Text>
						</Form.Group>
						<Button
							variant='primary'
							type='submit'
							onClick={handleSubmit}
							style={{ margin: '1rem' }}>
							Submit
						</Button>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</>
	);
}

export default Header
