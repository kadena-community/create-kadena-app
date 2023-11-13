<script lang="ts">
import { HalfCircleSpinner } from 'epic-spinners';
import writeMessage from './utils/writeMessage';
import readMessage from './utils/readMessage';

export default {
  data: () => ({
    account: '',
    messageFromChain: '',
    messageToWrite: '',
    writeInProgress: false,
  }),

  methods: {
    async readMessage() {
      this.messageFromChain = await readMessage({ account: this.account });
    },
    async writeMessage() {
      this.writeInProgress = true;
      await writeMessage({
        account: this.account,
        messageToWrite: this.messageToWrite,
      });
      this.writeInProgress = false;
      this.messageToWrite;
    },
  },
  components: {
    HalfCircleSpinner,
  },
};
</script>

<template>
  <main class="grid">
    <div class="card">
      <header>
        <h1 class="title">Welcome to <span>Kadena!</span></h1>
      </header>
      <p>
        This is the Kadena starter template using vuejs to help you get started
        on your blockchain development. Use the form below to interact with the
        Kadena blockchain using <code>@kadena/client</code> and edit
        <code>src/App.vue</code> to get started.
      </p>
    </div>
    <div class="card">
      <h3 class="cardTitle">Interact with the blockchain</h3>
      <section class="cardSection">
        <label for="account" class="fieldLabel">My Account</label>
        <input
          id="account"
          v-model="account"
          placeholder="Please enter a valid k:account"
        />
      </section>
      <section class="cardSection">
        <label for="write-message" class="fieldLabel">Write Message</label>
        <textarea
          id="write-message"
          v-model="messageToWrite"
          :disabled="writeInProgress || !account"
        ></textarea>
        <button
          @click="writeMessage"
          :disabled="!messageToWrite || writeInProgress"
        >
          Write
        </button>
        <half-circle-spinner
          :animation-duration="1000"
          :size="30"
          color="#ff1d5e"
          v-show="writeInProgress"
        />
      </section>
      <section class="cardSection">
        <label for="read-message" class="fieldLabel">Read Message</label>
        <textarea
          id="read-message"
          disabled
          v-model="messageFromChain"
        ></textarea>
        <button @click="readMessage" :disabled="!account">Read</button>
      </section>
    </div>
    <div class="card">
      <h3 class="cardTitle">Resources</h3>
      <a href="https://docs.kadena.io/"
        >Find in-depth information about Kadena. &rarr;</a
      >
      <a
        href="https://github.com/kadena-community/kadena.js/tree/main/packages/tools/create-kadena-app/pact"
        >The smart contract powering this page. &rarr;</a
      >
    </div>
  </main>
</template>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  font-size: 1.25rem;
}

.card {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 100%;
  max-width: 1000px;
}

.cardTitle {
  margin: 0.5rem 0;
}

.cardSection {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cardSection h4 {
  margin: 1.5rem 0;
}

.cardSection input,
.cardSection textarea {
  width: 300px;
}

header {
  text-align: center;
}

.title {
  margin: 1rem;
}

.title span {
  color: #ed098f;
}

.fieldLabel {
  margin: 1.25rem 0 0.5rem;
  font-weight: bold;
}
</style>
