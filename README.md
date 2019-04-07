# shopping-cart

### How to install
```bash
npm install
```

### How to run tests
```bash
npm test
```

### How to open test coverage in a browser
```bash
open ./coverage/index.html
```

### How to check the scenarios results

You can check the `./tests/integration/Scenarios.test.js` for the step by step execution of the scenarios.

Also, somewhere on the test logs other than the coverage, you should see something like this one for the scenarios:

```bash
  SCENARIO #1
Items:
ult_small Unlimited 1GB $24.9 (QTY x 3)
ult_large Unlimited 5GB $44.9 (QTY x 1)
=======================================
Cart Total: $ 94.7
    ✓ should calculate the expected amounts for scenario #1

  SCENARIO #2
Items:
ult_small Unlimited 1GB $24.9 (QTY x 2)
ult_large Unlimited 5GB $44.9 (QTY x 4)
=======================================
Cart Total: $ 209.4
    ✓ should calculate the expected amounts for scenario #2

  SCENARIO #3
Items:
ult_small Unlimited 1GB $24.9 (QTY x 1)
ult_medium Unlimited 2GB $29.9 (QTY x 2)

 Free:
1gb 1 GB Data-pack
1gb 1 GB Data-pack
=======================================
Cart Total: $ 84.7
    ✓ should calculate the expected amounts for scenario #3

  SCENARIO #4
Items:
ult_small Unlimited 1GB $24.9 (QTY x 1)
1gb 1 GB Data-pack $9.9 (QTY x 1)
=======================================
Cart Total: $ 31.32
    ✓ should calculate the expected amounts for scenario #4
```
