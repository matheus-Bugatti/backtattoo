class HomeController {
    index(req, res) {
        res.status(200).json({
            message: 'eita mundaoo!'
        })
    }
}

export default new HomeController()
