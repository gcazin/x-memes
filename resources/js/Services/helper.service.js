class HelperService {
    constructor() {
        this.props = {}
        this.setTheme()
    }

    setProps(props) {
        this.props = props.initialPage.props
    }

    /**
     * Checks if the user has the specified role(s) based on the stored authentication roles.
     */
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

    /**
     * Sets the theme based on the stored localStorage.
     */
    setTheme() {
        if (typeof localStorage.theme !== 'undefined') {
            this.storeTheme(localStorage.theme)
        } else {
            this.storeTheme('dark')
        }
    }

    /**
     * Stores the specified theme in localStorage and updates the body's data-theme attribute.
     */
    storeTheme(theme) {
        const handleTheme = localStorage.theme ? theme : 'dark'
        document.querySelector('body').setAttribute('data-theme', handleTheme)
        localStorage.theme = handleTheme
    }

    /**
     * Formats a value and word into a pluralized string based on the value.
     */
    plural(value, word) {
        return value > 1 ? `${value} ${word}s` : `${value} ${word}`
    }
}

export default new HelperService()
