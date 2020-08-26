# Aspire app
### Requirement
1. Node version >= 10
2. Pod version >= 1.7
### Run app
```
yarn install
```
1. iOS
```
cd ios
pod install
yarn ios

```
2. android

create android/local.properties file with content
`sdk.dir={YOUR_ANDROID_SDK_PATH}`
```
yarn android
```
### Work flow
- After launching app, we see `Loanlist` screen
- Press `+` button at bottom to submit a loan.
- After submmitting, wait for 10 second, then pull to refresh `Loanlist`, we will get approved loans.
- In `Loanlist`, approved and repaying items will show `Repay` button.
