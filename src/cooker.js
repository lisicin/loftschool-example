class Cooker {
    constructor(tableBody) {
        this.__tableBody = tableBody
        this.setFilter('')
    }

    setFilter(str) {
        this.__filter = str
        this.__filtering = true
        this.refresh()
    }

    addCookie(name, value) {
        this.__filtering = false
        document.cookie = `${name}=${value};expires=${this.setExpiration()}`
        this.refresh()
    }

    refresh() {
        this.__tableBody.innerHTML = ''
        this.cookies = this.getCookies()
    }

    deleteCookie(name) {
        document.cookie = `${name}=;expires=${new Date(0)}`
        this.refresh()
    }

    isAlowed(name, value) {
        if (this.__filtering) {
            return name.indexOf(this.__filter) >= 0 || value.indexOf(this.__filter) >= 0
        }

        return name.indexOf(this.__filter) >= 0
    }

    setExpiration() {
        let today = new Date()

        return today.setDate(today.getDate() + 1)
    }

    getCookies() {
        return document.cookie
            .split('; ')
            .filter(Boolean)
            .map(cookie => cookie.match(/^([^=]+)=(.+)/))
            .reduce((obj, [, name, value]) => {
                obj[name] = this.newTableRow(name, value)

                return obj;
            }, {});
    }

    newTableRow(name, value) {
        if (!this.isAlowed(name, value)) {
            return false
        }
        let row = this.__tableBody.insertRow()

        this.insertCells(row, [name, value, this.newDeleteButton(name)])

        return row
    }

    insertCells(row, values) {
        values.forEach((value) => {
            let cell = row.insertCell()

            if (typeof value != 'object') {
                cell.innerText = value
            } else {
                cell.appendChild(value)
            }
        })
    }

    newDeleteButton(name) {
        let button = document.createElement('button')

        button.innerText = 'Удалить'
        button.addEventListener('click', () => {
            this.deleteCookie(name)
        })

        return button
    }

}

export default Cooker;