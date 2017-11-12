object is not allowed as react components

exp:
<div>{this.props.data}</div>
(use .toString() to test)

---
to render the data from async call directly in render for test
<pre>
{ JSON.stringify (this.props.xxxx) }
</pre>
