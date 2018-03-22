
declare interface String
{
    hexEncode(): string
    hashCode(): number
    /**
     * default: ignoreCaseSensitive = true
     */
    contains(searchString: string, ignoreCaseSensitive?: boolean): boolean
    startsWith(searchString: string, position?: number): boolean
    endsWith(searchString: string, position?: number): boolean
    parseQuery(): any
    truncate(length: number, ending?: string): string
}

if (!String.prototype.truncate)
{
    String.prototype.truncate = function(length, ending)
    {
        if (length == null)
        {
            length = 100
        }
        if (ending == null)
        {
            ending = '...'
        }
        if (this.length > length)
        {
            return this.substring(0, length - ending.length) + ending
        } else
        {
            return this
        }
    }
}

if (!String.prototype.hexEncode)
{
    String.prototype.hexEncode = function()
    {
        let result = ''
        for (let i = 0; i < this.length; i++)
        {
            result += this.charCodeAt(i).toString(16)
        }

        return result
    }
}

if (!String.prototype.hashCode)
{
    String.prototype.hashCode = function()
    {
        return this.split('').reduce((prevHash, currVal) =>
            ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0)
    }
}

if (!String.prototype.contains)
{
    String.prototype.contains = function(it, ignoreCase)
    {
        if (ignoreCase === false)
        {
            return this.indexOf(it) != -1
        }
        else
        {
            return this.toLowerCase().indexOf(it.toLowerCase()) != -1
        }
    }
}

if (!String.prototype.startsWith)
{
    String.prototype.startsWith = function(searchString, position)
    {
        position = position || 0
        return this.substr(position, searchString.length) === searchString
    }
}

if (!String.prototype.endsWith)
{
    String.prototype.endsWith = function(searchString, position)
    {
        const subjectString = this.toString()
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length)
        {
            position = subjectString.length
        }
        position -= searchString.length
        const lastIndex = subjectString.indexOf(searchString, position)
        return lastIndex !== -1 && lastIndex === position
    }
}

if (!String.prototype.parseQuery)
{
    String.prototype.parseQuery = function parseQuery()
    {
        const query = {}
        const a = this.split('&')
        for (let i = 0; i < a.length; i++)
        {
            const b = a[i].split('=')
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '')
        }
        return query
    }
}
