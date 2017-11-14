object is not allowed as react components

exp:
<div>{this.props.data}</div>
(use .toString() to test)

---
to render the data from async call directly in render for test
<pre>
{ JSON.stringify (this.props.xxxx) }
</pre>


{
		id : uid.v4 (),
		type : 'Basic',
		bsStyle : 'info',
		description : 'Very good to start your business',
		price : 23.00,
		capabilities : [
			{key : 'Android / iOS', value : 'Yes'},
			{key : 'Admin Web Access', value : '85421'},
			{key : 'Appointments', value : 'Yes'},
			{key : 'Import / Export Data', value : 'Yes'},
			{key : 'Data Storage', value : '1GB'},
		],
	},
