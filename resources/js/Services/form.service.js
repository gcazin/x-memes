import {useForm} from "@inertiajs/vue3";
import { _ } from 'lodash'
// TODO
class FormService {
    constructor() {
        this.form = null;
        this.route = null;
        this.crud = {
            create: null,
            update: null,
            delete: null,
        }
        this.props = null;
        this.modalName = null;
        this.transformFields = null;
        this.fields = null;
        return this
    }

    setModalName(name) {
        this.modalName = name.charAt(0).toUpperCase() + name.slice(1)
        return this
    }

    setProps(props) {
        this.props = props.initialPage.props
        return this
    }

    setBaseRoute(route) {
        this.route = route
        return this
    }

    setFields(fields) {
        this.fields = fields
        return this
    }

    setCreate() {
        return () => {
            this.form.post(route(`${this.route}.create`), {
                preserveScroll: true,
                onSuccess: () => this.closeModal('create'),
                onFinish: () => this.reset(),
            });
        };
    }

    setUpdate(item) {
        return this.post(route(`${this.route}.update`, item.id), {
            preserveScroll: true,
            onSuccess: () => this.closeModal('update', item),
            onFinish: () => this.reset(),
        });
    }
    setDelete(item) {
        this.crud.delete = () => {
            this.delete(route('admin.tag.destroy', item.id), {
                preserveScroll: true,
                onSuccess: () => this.closeModal('delete', item),
            });
        };
    }

    /**
     * In case of editing
     * @param name
     * @param data
     */
    async openModal(name, data) {
        let modalId = `#${name}${this.modalName}`
        if (data) {
            Object.assign(this, data)

            modalId = `#${name}${this.modalName}${data.id}`
        }

        switch (name) {
            case 'create':
                this.setCreate()
                break
            /*case 'update':
                this.setUpdate(data)
                break*/
            case 'delete':
                this.setDelete(data)
                break
        }

        /*if (this.transformFields) {
            this.changeSubPropertyValue()
        }*/

        this.name = 'ouio'

        document.querySelector(modalId).showModal()

        return this
    }

    closeModal(crudType, item = null) {
        let id
        if (item) {
            id = `#${crudType}${this.modalName}${item.id}`
        } else {
            id = `#${crudType}${this.modalName}`
        }
        document.querySelector(id).close()

        if (crudType === 'update') {
            this.reset()
        }
    }

    setSubPropertyValue(fields) {
        this.transformFields = fields

        return this
    }

    getProperty(field) {
        return this[field]
    }

    changeSubPropertyValue() {
        const splitting = []
        const split = this.transformFields.split(',')
        if (split) {
            split.forEach((s) => {
                const splitByComma = s.split(':')
                splitting.push(splitByComma)
            })
            splitting.forEach((group) => {
                if (group[0] in this) {
                    this[group[0]] = _.get(this[group[0]], 'en')
                }
            })
        }
        return this
    }

    getForm() {
        return this
    }
}

export default FormService;
