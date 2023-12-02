class HelperService {
    constructor() {
        this.props = {};
    }

    setProps(props) {
        this.props = props.initialPage.props
    }

    checkRoles(role) {
        const roles = this.props.auth.roles
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
}

export default new HelperService();
