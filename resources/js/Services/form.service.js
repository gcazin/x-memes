class FormService {
    constructor() {
        this.form = null
        this.routeName = null
        this.props = null
        this.modalName = null
        this.preserveState = false
        return this
    }

    setProps(props) {
        this.props = props.initialPage.props
        return this
    }

    setForm(form) {
        this.form = form
        return this
    }

    setModalName(name) {
        this.modalName = name
        return this
    }

    setRouteName(routeName) {
        this.routeName = routeName
        return this
    }

    setProperties(item) {
        Object.keys(this.form.data()).map((property) => {
            if (property in item) {
                if (Array.isArray(item[property])) {
                    this.form[property] = item[property].map((p) => p.name)
                } else {
                    this.form[property] = item[property]
                }
            }
        })
    }

    setPreserveState() {
        this.preserveState = true

        return this
    }

    getRouteName() {
        return this.routeName
    }

    openModal(name, item = null) {
        let selector = this.handleSelector(name, item)

        this.setModalName(selector)

        if (item) {
            this.setProperties(item)
        }

        document.querySelector(this.modalName).showModal()
    }

    closeModal() {
        const modal = document.querySelector(this.modalName)
        if (modal) {
            modal.close()
        }

        if (this.form) {
            this.form.reset().clearErrors()
        }
    }

    handleSelector(name, item = null) {
        let selector = `#${name}Modal`
        if (item) {
            selector = `#${name}Modal${item.id}`
        }
        return selector
    }

    handle(action, item = null, method = 'put') {
        const routeName = this.getRouteName()

        switch (action) {
            case 'store':
                this.form.post(route(`${routeName}.store`, item?.id), {
                    preserveScroll: true,
                    preserveState: this.preserveState,
                    onSuccess: () => {
                        this.closeModal()
                    },
                })
                break
            case 'update':
                this.form.put(route(`${routeName}.update`, item?.id), {
                    preserveScroll: true,
                    preserveState: this.preserveState,
                    onSuccess: () => this.closeModal(),
                })
                break
            case 'destroy':
                this.form.delete(route(`${routeName}.destroy`, item?.id), {
                    preserveScroll: true,
                    preserveState: this.preserveState,
                    onBefore: () =>
                        confirm('Es-tu sûr de supprimer cet élément ?'),
                })
                break
            case action:
                this.form[method](
                    route(
                        routeName ? `${routeName}.${action}` : action,
                        item?.id
                    ),
                    {
                        preserveScroll: true,
                        preserveState: this.preserveState,
                        onSuccess: () => this.closeModal(),
                    }
                )
        }
    }
}

export default new FormService()
