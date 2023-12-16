"use client";
import { Container, Text, Button, Group } from "@mantine/core";
import classes from "./Hero.module.css";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "green", to: "teal" }}
            inherit
          >
            SecretGifter
          </Text>{" "}
          Where Surprises Meet Smiles in the Spirit of Giving
        </h1>

        <Text className={classes.description} color="dimmed">
        Surprises, Smiles, and Shared Secrets – Unleash the Magic of Secret Santa!
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "green", to: "teal" }}
            component={Link}
            href="/auth"

          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/n4ze3m/secret-gifter"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<IconBrandGithub size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
