import { trans } from 'laravel-vue-i18n'

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
        if (typeof window !== 'undefined') {
            if (typeof localStorage.theme !== 'undefined') {
                this.storeTheme(localStorage.theme)
            } else {
                this.storeTheme('dark')
            }
        }
    }

    /**
     * Stores the specified theme in localStorage and updates the body's data-theme attribute.
     */
    storeTheme(theme) {
        if (typeof window !== 'undefined') {
            const handleTheme = localStorage.getItem('theme') ? theme : 'dark'
            document
                .querySelector('body')
                .setAttribute('data-theme', handleTheme)
            localStorage.setItem('theme', handleTheme)
        }
    }

    /**
     * Formats a value and word into a pluralized string based on the value.
     */
    plural(value, word) {
        return value > 1
            ? `${value} ${trans(word)}s`
            : `${value} ${trans(word)}`
    }
}

export default new HelperService()
