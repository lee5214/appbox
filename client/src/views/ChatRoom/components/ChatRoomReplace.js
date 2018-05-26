import React from 'react'
import {Row,Col}from 'reactstrap'

const Replace = ()=>{
	return (
		<div className={'animated fadeIn justify-content-center align-self-center pt-4'}>
		<Row>
			<Col xs={10} >
				<p>Google Cloud's flexable node environment hasn't supported Socket.io yet</p>
				<p>And I found firebase's realtime database is much prettier for chat-ish app</p>
				<p>So I removed Socket.io and re-wrote the chat function, please use chat room version 2</p>
			</Col>
		</Row>
		</div>
	)
}

export default Replace
