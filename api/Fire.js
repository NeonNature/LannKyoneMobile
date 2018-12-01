import firebase from 'firebase'; 

class Fire {
    constructor() {
        this.init()
        this.observeAuth()
    }

    init = () => (
        firebase.initializeApp({
            apiKey: "AIzaSyDfX39QtLf8l8NCNKi2ES-RDqR3Q-N3eaY",
            authDomain: "lankyone-mobile.firebaseapp.com",
            databaseURL: "https://lankyone-mobile.firebaseio.com",
            projectId: "lankyone-mobile",
            storageBucket: "lankyone-mobile.appspot.com",
            messagingSenderId: "556031698288",
        })
    )

    observeAuth = () => (
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
    )

    onAuthStateChanged = user=> {
        if(!user) {
            try {
                firebase.auth().signInAnonymously()
            } catch ({message}) {
                alert(message)
            }
        }
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    on = callback => (
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => 
                callback(this.parse(snapshot)
            )
        )
    )

    parse = snapshot => {
        const {timestamp: numberStamp, text, user} = snapshot.val()
        const { key: _id } = snapshot

        const createdAt = new Date(numberStamp)

        const message = {
            _id,
            createdAt,
            text,
            user,
        }

        return message
    }

    get uid() {
        return {
            name: this.props.navigation.state.params.name,
            _id: Fire.shared.uid,
        }
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP
    }

    send = messages => {
        for (let i=0; i < messages.length; i++) {
            const { text, user } = messages[i]

            const message = {
                text,
                user,
                timestamp : this.timestamp,
            }
            
            this.append(message)
        }
    }

    append = message => (
        this.ref.push(message)
    )


    off() {
        this.ref.off()
    }
    
}

Fire.shared = new Fire()
export default Fire