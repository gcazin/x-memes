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

    openModal(name, item = null) {
        let selector = this.handleSelector(name, item)
        document.querySelector(selector).showModal()

        form.name = item.name
    }

    closeModal(name, item = null) {
        let selector = this.handleSelector(name, item)
        document.querySelector(selector).close()
    }

    handleSelector(name, item = null) {
        let selector = `#${name}Modal`
        if (item) {
            selector = `#${name}Modal${item.id}`
        }
        return selector}

}

export default new FormService;
