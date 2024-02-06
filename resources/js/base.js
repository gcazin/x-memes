/**
 * Translate application.
 */

export default {
    methods: {
        __(key, replace = {}) {
            if (
                typeof key !== 'undefined' &&
                key !== null &&
                typeof key === 'string'
            ) {
                const trimmedKey = key.trim()

                let translation = this.$page.props.language[trimmedKey]
                    ? this.$page.props.language[trimmedKey]
                    : trimmedKey

                Object.keys(replace).forEach(function (key) {
                    translation = translation.replace(':' + key, replace[key])
                })

                return translation
            }
        },
    },
}
