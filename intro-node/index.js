const express = require('express');
const app = express();

app.get('*',(request, response) => {

    response.send('Server Up');
    

});

app.listen(3000, () => console.log('Server on'));
