<page>
    <actionBar title="Testo"/>
    
    <button text="Home" on:tap="{ () => navigate({page: Home}) }"/>
</page>

<script>
    import Home from "./Home.svelte";
    import { navigate } from "svelte-native";
</script>