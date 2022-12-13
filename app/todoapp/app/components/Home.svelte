
<page>
    <actionBar title="My Todos" />

    <tabView>
        <tabViewItem title="Todo">
            <gridLayout columns="*, 120" rows="70, *">
                <textField col="0" row="0" bind:text="{textFieldValue}" hint="New Task..." editable="true"
                    on:returnPress="{onButtonTap}"/>
                <button col="1" row="0" text="Add Task" on:tap="{onButtonTap}" class="-primary"/>

                <listView items="{todos}" on:itemTap="{onItemTap}" row="1" colSpan="2">
                    <Template let:item>
                        <label text="{item.name}" textWrap="true"/>
                    </Template>
                </listView>
            </gridLayout>
        </tabViewItem>

        <tabViewItem title="Completed">
            <listView items="{dones}" on:itemTap="{onDoneTap}">
                <Template let:item>
                    <label text="{item.name}" textWrap="true"/>
                </Template>
            </listView>
        </tabViewItem>
    </tabView>
</page>

<script>
    import { action } from '@nativescript/core';
    import { Template } from 'svelte-native/components'

    let todos = []
    let dones = []
    const removeFromList = (list, item) => list.filter(t => t !== item);
    const addToList = (list, item) => [item, ...list];
    let textFieldValue = ""

    async function onItemTap(args) {
        let result = await action("What do you want to do with this task?", "Cancel",[
            "Complete", "Delete"
        ]);
        
        console.log(result);
        let item = todos[args.index]
        switch (result) {
            case "Complete":
                dones = addToList(dones, item);
                todos = removeFromList(todos, item);
                break;
            case "Delete":
                todos = removeFromList(todos, item);
                break;
            case "Cancel" || undefined:
                break;
        }
    }

    async function onDoneTap(args) {
        let result = await action("What to do?", "Cancel", [
            "Uncomplete",
            "Delete"
        ]);

        console.log(result);
        let item = dones[args.index];
        switch (result) {
            case "Delete":
                dones = removeFromList(dones, item);
                break;
        }
    }

    function onButtonTap() {
        if (textFieldValue === "") return; // Prevents users from entering an empty string.
        console.log("New task added: " + textFieldValue + "."); // Logs the newly added task in the console for debugging.
        todos = [{ name: textFieldValue }, ...todos] // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
        textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    }
</script>

<style>
    textField {
        font-size: 20px;
    }
</style>