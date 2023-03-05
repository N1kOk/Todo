import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        title: '',
        text: '',
        date: '',
        dialogTitle: '',
        buttonText: '',
        isShowed: false,
        isProcessing: false,
    }),
    actions: {
        showDialog({ dialogTitle, buttonText, title, text, date }: Record<string, string>) {
            return new Promise(resolve => {
                this.title = title || ''
                this.text = text || ''
                this.date = date || ''
                this.dialogTitle = dialogTitle
                this.buttonText = buttonText

                this.isShowed = true

                const unsubscribe = this.$subscribe((_, state) => {
                    if (state.isProcessing) {
                        unsubscribe()
                        resolve(true)
                    }

                    if (!state.isShowed) {
                        unsubscribe()
                        resolve(false)
                    }
                })
            })
        },
        closeDialog() {
            this.isShowed = false
            this.isProcessing = false
        }
    },
})
