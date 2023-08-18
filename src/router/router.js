const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    return res.render('pages/index', {message: 'Hi express elastic search'})
})

module.exports = {
    router
}