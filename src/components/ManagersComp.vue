<template>
  <div class="managers_card">
    <div class="img row justify-center">
      <img src="/images/manager.png" alt="" />
    </div>

    <p class="manager_name">Marvellous Dick</p>

    <p class="manager_position">CEO</p>
    <p class="manager_email">marvellousdick@yahoo.com</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.managers_card {
  background: url("/images/bgg.svg") white no-repeat;
  // background-size: cover;
  background-position: center;
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: 6px 6px 54px 0px #00000008;
  // background: white;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  .img {
    margin-bottom: 1rem;
    img {
      width: 110px;
      height: 110px;
      border-radius: 50%;
    }
  }
  .manager_name {
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.05714285001158714px;
    text-align: center;
  }
  .manager_position {
    font-size: 14px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: -0.049999989569187164px;
    text-align: center;
    // margin: 1rem 0;
  }

  .manager_email {
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: -0.049999989569187164px;
    text-align: center;
  }
}
</style>
