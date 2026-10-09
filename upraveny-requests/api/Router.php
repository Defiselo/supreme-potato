<?php
class Router
{
    private array $routes = [];

    public function add(string $method, string $pattern, callable $handler): void
    {
        $this->routes[] = [$method, explode('/', $pattern), $handler];
    }

    public function dispatch(string $method, array $uri, $input): bool
    {
        foreach ($this->routes as [$routeMethod, $parts, $handler]) {
            if ($routeMethod === $method && $this->matches($parts, $uri)) {
                $handler($uri, $input);
                return true;
            }
        }
        return false;
    }

    private function matches(array $parts, array $uri): bool
    {
        foreach ($parts as $i => $part) {
            $segment = $uri[$i + 1] ?? null;
            if ($part === '*' || ($part !== '' && $part[0] === '{')) {
                if ($segment === null) {
                    return false;
                }
            } elseif ($segment !== $part) {
                return false;
            }
        }
        return true;
    }
}
