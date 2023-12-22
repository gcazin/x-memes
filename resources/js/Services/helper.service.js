class HelperService {
    constructor() {
        this.props = {}
        this.setTheme()
    }

    setProps(props) {
        this.props = props.initialPage.props
    }

    checkRoles(role) {
        const roles = this.props.auth?.roles
        if (roles) {
            const roleSplitting = role.split(',')
            if (roleSplitting.length > 1) {
                return roleSplitting.some((r) => {
                    return roles.includes(r)
                })
            } else {
                return roles.includes(role)
            }
        }
    }

    setTheme() {
        if (typeof localStorage.theme !== 'undefined') {
            this.storeTheme(localStorage.theme)
        } else {
            this.storeTheme('dark')
        }
    }

    storeTheme(theme) {
        const handleTheme = localStorage.theme ? theme : 'dark'
        document.querySelector('body').setAttribute('data-theme', handleTheme)
        localStorage.theme = handleTheme
    }
}

export default new HelperService()
