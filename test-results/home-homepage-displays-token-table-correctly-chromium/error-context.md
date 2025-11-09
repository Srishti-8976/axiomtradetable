# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - button "New Pairs" [ref=e5]
        - button "Final Stretch" [ref=e6]
        - button "Migrated" [ref=e7]
      - table [ref=e9]:
        - rowgroup [ref=e10]:
          - row "Name Symbol Price ↑ % Change ⓘ" [ref=e11]:
            - cell "Name" [ref=e12]
            - cell "Symbol" [ref=e13]
            - cell "Price ↑" [ref=e14] [cursor=pointer]
            - cell "% Change ⓘ" [ref=e15] [cursor=pointer]
        - rowgroup [ref=e16]:
          - row "DOGE DOGE $0.18 +0.08%" [ref=e17] [cursor=pointer]:
            - cell "DOGE" [ref=e18]
            - cell "DOGE" [ref=e19]:
              - button "DOGE" [ref=e20]
            - cell "$0.18" [ref=e21]
            - cell "+0.08%" [ref=e22]
          - row "SOL SOL $182.45 -0.00%" [ref=e23] [cursor=pointer]:
            - cell "SOL" [ref=e24]
            - cell "SOL" [ref=e25]:
              - button "SOL" [ref=e26]
            - cell "$182.45" [ref=e27]
            - cell "-0.00%" [ref=e28]
  - button "Open Next.js Dev Tools" [ref=e34] [cursor=pointer]:
    - img [ref=e35]
  - alert [ref=e38]
```