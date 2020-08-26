# Edelsync Package

This package provides an abstract implementation for syncing customer data between their APIs and our Edelog Software.

## Setting up

```shell script
npm install
# starting dev server with logging enabled
LOGGING=TRUE npm run dev 

# start production server
npm start
```

## Environment Variables

<table>
    <thead>
        <td>Variable</td>
        <td>Values</td>
    </thead>
    <tr>
        <td><code>LOGGING</code></td>
        <td><code>TRUE</code> or <code>FALSE</code></td>
    </tr>
    <tr>
        <td><code>ALLOWED_IP_ADDRESSES</code></td>
        <td><code>::1, 127.0.0.1, 10.0.0.1</code> (separated with <code>, `</code>) </td>
    </tr>
</table>

## Todo

* Send request to Copy Server if something fails
* Send request to Master Server if something fails
