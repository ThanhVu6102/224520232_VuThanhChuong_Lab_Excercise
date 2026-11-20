# Lab 4 Git submission

Repository: [ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise)

Branch: main.

## Setup and exercise commits

| Commit | Description |
| --- | --- |
| [42afa09](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise/commit/42afa0998bfe99f5e84444fac623d083cd600948) | chore(lab4): define contracts and reproducible quality tooling |
| [82e2307](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise/commit/82e230765dd339362e3796fa6fb47e6b93c51166) | feat(ex1): implement lazy detail routes and skeleton feedback |
| [616663a](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise/commit/616663aa1fea5b6eb0a6af9ed48306e62315ddfb) | test(ex1): verify lazy loading and route recovery |
| [becbb1c](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise/commit/becbb1c78868e12b0863567da8ae12eb19c224e7) | feat(ex2): add shared router layout |
| [1ef6fcb](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise/commit/1ef6fcb8d3a1fbe8f4f32e8f1c9a12b1dc6679b0) | feat(ex2): add detail route handling and tests |
| [09cc01d](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise/commit/09cc01d3e615bf956a202315309b4b5113781bf4) | feat(ex3): define synchronous form context and validation |
| [5e21798](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise/commit/5e21798c143c83f49d79713f6c9b7b2b5c84b7a6) | feat(ex3): implement accessible context input fields |
| [161ed11](https://github.com/ThanhVu6102/224520232_VuThanhChuong_Lab_Excercise/commit/161ed115eddc0b7c650b5a85e8a35b676e04c96c) | feat(ex3): add form submission and data inspector |

The report and verification records are included in a separate documentation commit containing this file. Its hash is available in Git history.

## Specification scope

Exercise requirements come from slides 9–15 and component contracts on slides 22–24. Workflow requirements come from slide 8. Slide 3 is explicitly excluded as a specification source.

## Validation

Fresh npm ci installs and npm run check were completed in the target repository for all three projects. Results: 8 + 6 + 5 = 19 passing tests; lint, formatting and production builds passed. A dependency-copy omission in the previous local installation was corrected by reinstalling from the lockfiles. Dependencies and generated builds are ignored by Git.

## History and scope

These commits submit previously implemented and reviewed work. They do not reconstruct a historical test-first development sequence. The review did run failing regression tests before fixing the observed issues. Only Lab4_Exercise and the English Lab 4 report are submitted; unrelated untracked Lab 3 files are left untouched.
