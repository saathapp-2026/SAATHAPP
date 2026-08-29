#!/bin/bash
for file in src/components/wholesale/dashboard/*.jsx; do
  sed -i '' 's/const { \(.*\) } = useWholesale ? useWholesale() :/const _wc = useWholesale();\n  const { \1 } = _wc ||/' "$file"
done
